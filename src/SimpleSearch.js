/**
 * @name SimpleSearch
 * @desc Search Elemnts by Content
 * @author s.elyounsi
 * @version 1.0.0
 * @date 29.07.2024
*/
class SimpleSearch 
{
    /**
     * Creates an instance of SimpleSearch.
     * @param {string} input - The CSS selector for the input field used for search.
     * @param {Object} [opt={}] - Optional settings to configure the search behavior.
     * @param {number} [opt.stringLength=2] - Minimum length of the search term for filtering.
     * @param {number} [opt.calcScrollTop=0] - Additional offset for scroll position.
     * @param {boolean} [opt.scroll=true] - Whether to scroll to the element when it is found.
     * @param {string} [opt.noResults="No results found!"] - Message displayed when no results are found.
     */
    constructor(input, opt) 
    {
        this.version    = "1.0.0"; 
        this.cache      = 86400; // 24h
        this.name       = "SimpleSearch"; 

        this.settings = Object.assign({
            stringLength: 2,
            calcScrollTop: 0,
            scroll: true,
            noResults: "No results found!"
        }, opt);

        this.input      = document.querySelector(input);
        this.container  = this.createContainer();
        this.list       = this.createList();
        this.parm       = new URLSearchParams(window.location.search);

        this.init();   
    }

    /**
     * Initializes the component by checking for errors and loading the necessary functions.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    async init() 
    {
        if(this.errorCheck(this.settings)) {
            this.loadFunction();
        }
    }

    /**
     * Loads the necessary data and sets up event listeners for filtering and clearing results.
     * @returns {Promise<void>} A promise that resolves when the loading and setup are complete.
     */
    async loadFunction() 
    {
        let that    = this; 
        let page    = await this.getHTML(this.settings.page);
        let list    = page.querySelectorAll(this.settings.elements);

        if(this.parm.get('title') && this.settings.scroll) {
            this.scrollToElement(this.parm.get('title'));
        }

        // FILTER RESULTS ON TYPING
        that.input.addEventListener("input", function() {
            that.searchFilter(this.value, list);
        }); 
        // REMOVE RESULTS ON MOUSELEAVE
        that.container.addEventListener("mouseleave", (e) => {
            that.clearFilter()
        })
        // FILTER RESULTS ON MOUSEOVER
        that.input.addEventListener("mouseover", (e) => {
            that.searchFilter(e.target.value, list);
        })
    }

    /**
     * Clears all items from the list.
     * @returns {void}
     */
    clearFilter() 
    {
        this.list.innerHTML= "";
    }

    /**
     * Filters the list based on the search value and updates the list with the results.
     * @param {string} value - The search term to filter the list.
     * @param {HTMLElement[]} list - The list of elements to filter.
     * @returns {void}
     */
    searchFilter(value, list) 
    {
        let data = this.searchResults(value, list);
        this.clearFilter();

        if(data.length >= 1 && value.length >= this.settings.stringLength) {
            data.forEach((item) => {
                this.createListItem(item);
            })

        } else if(data.length === 0) {
            this.createListItem(this.settings.noResults);
        } else {
            this.clearFilter()
        }
    }

    /**
     * Searches for elements in the list that include the search value.
     * @param {string} value - The search term to match against the list items.
     * @param {HTMLElement[]} list - The list of elements to search through.
     * @returns {HTMLElement[]} The list of matching elements.
     */
    searchResults(value, list) 
    {
        let data = [];

        for(let ele of list) {
            if(ele.innerText.toLowerCase().includes(value.toLowerCase())) {
                data.push(ele);
            }
        }
        
        return data;
    }

    /**
     * Creates a list item (`<li>`) and appends it to the list.
     * If `ele` is an object, an anchor (`<a>`) is created inside the list item.
     * @param {string|Object} ele - The content or configuration for the list item.
     * @returns {void}
     */
    createListItem(ele) 
    {
        let listItem = document.createElement('li'); 

        if(typeof ele === "object") {
            this.createElement({ele: 'a', innerHTML: ele.innerText, title: ele.innerText, href : `${this.settings.page}?title=${ele.innerText}`}, listItem)
        } else {
            listItem.innerHTML = ele; 
        }

        this.list.appendChild(listItem);
    }

    /**
     * Scrolls smoothly to an element that matches the given title and highlights it.
     * @param {string} title - The title to match for scrolling and highlighting.
     * @returns {void}
     */
    scrollToElement(title) 
    {
        let list = document.querySelectorAll(this.settings.elements);
        for(let ele of list) {
            if(ele.innerText.includes(title)) {
                ele.classList.add("active");
                const y = ele.getBoundingClientRect().top + window.pageYOffset + this.settings.calcScrollTop;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }
    }

    /**
     * Creates a list element (`<ul>`) and appends it to the container.
     * @returns {HTMLElement} The created list element.
     */
    createList() 
    {
        return this.createElement({ele: 'ul', placeholder: this.settings.placeholder, classList: `${this.name}List`}, this.container)
    }

    /**
     * Creates a container element, moves the input field into it, and returns the container.
     * @returns {HTMLElement} The created container element.
     */
    createContainer() 
    {
        let wrapper = document.createElement('div');
        wrapper.classList = `${this.name}Container`;

        // set the wrapper as child (instead of the element)
        this.input.after(wrapper)
        // add input field in to wrapper
        wrapper.appendChild(this.input);
        // return wrapper
        return wrapper;
    }

    /**
     * Checks for errors in the provided settings and logs messages if issues are found.
     * @param {Object} settings - Configuration object to check for errors.
     * @returns {boolean} True if no errors are found, otherwise false.
     */
    errorCheck(settings) 
    {    
        if (!this.input) {
            this.errorMessage("Search field could not be found, please check the selector!");
            return false;
        }
        if (!settings.page) {
            this.errorMessage("Path to the subpage is missing!");
            return false; 
        }

        return true;        
    }

    /**
     * Logs an error message to the console with the class name and version.
     * @param {string} message - The error message to log.
     */
    errorMessage(message) 
    {
        console.error(`${this.name} - ${this.version}: ${message}`);
    }

    /**
     * Creates an HTML element and appends it to a parent element.
     * @param {Object} child - Configuration object for the child element.
     * @param {HTMLElement} parent - Parent element to append the child to.
     * @param {boolean} [before=false] - If true, insert the child before the first child of the parent.
     * @returns {HTMLElement} The created element.
     */
    createElement(child, parent, before = false) 
    {
        let ele = document.createElement(child["ele"]);
        let dataset = child?.dataset ? child.dataset : false;

        delete child["ele"];
        delete child["dataset"];

        for(let type in child) {
            ele[type] = child[type];
        }

        if(dataset) {
            for(let type in dataset) {
            ele.dataset[type] = dataset[type];
            }  
        }

        before ? parent.insertBefore(ele, parent.firstChild) : parent.appendChild(ele);
        return ele;
    }

    /**
     * Performs a fetch request with cache control.
     * @param {string} url - The URL to fetch.
     * @returns {Promise<Response>} The fetch response.
     */
    async asyncGet(url) 
    {
        return fetch(url, {
            headers: {
                "Cache-Control": `max-age=${this.cache}`
            }
      });
    }

    /**
     * Fetches HTML content from a URL and parses it into a document.
     * @param {string} url - The URL to fetch HTML from.
     * @returns {Promise<Document>} The parsed HTML document.
     */
    async getHTML(url) 
    {
        return this.asyncGet(url).then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(text, 'text/html');
            return htmlDoc;
        });
    }
}