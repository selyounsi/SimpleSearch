
# SimpleSearch

**SimpleSearch** 

is a JavaScript class that provides a simple search function for a website. With this script, users can search for elements on the page that match specific criteria and display a list of the found search results.

## Purpose of SimpleSearch

SimpleSearch is ideal for websites that need a straightforward search function to search through specific elements based on their content. It can be used on various types of websites to make items such as jobs, products, articles, or other content searchable. The search feature allows users to quickly find relevant information and facilitates navigation on the website.

## Integrating SimpleSearch

1. Ensure that you have included the necessary JavaScript file `SimpleSearch.js` in your project.

2. Add the following JS call:
```javascript
CitySearch = new SimpleSearch(".SimpleSearchInput", {
    page: '/city.html',
    elements: 'li.city',
    calcScrollTop: -200
});
```

3. Ensure that there is an input field with the class `.SimpleSearchInput` on your page.

### Markup for the Filtered Subpage:
```html
<ul>
    <li class="city">Berlin</li>
    <li class="city">Hamburg</li>
    <li class="city">München</li>
    <li class="city">Köln</li>
    <li class="city">Frankfurt am Main</li>
    <li class="city">Stuttgart</li>
    <li class="city">Düsseldorf</li>
    <li class="city">Dortmund</li>
    <li class="city">Essen</li>
    <li class="city">Leipzig</li>
    <li class="city">Bremen</li>
    <li class="city">Dresden</li>
    <li class="city">Hannover</li>
    <li class="city">Nürnberg</li>
    <li class="city">Duisburg</li>
    <li class="city">Bochum</li>
    <li class="city">Wuppertal</li>
    <li class="city">Bielefeld</li>
    <li class="city">Bonn</li>
    <li class="city">Münster</li>
    <li class="city">Karlsruhe</li>
    <li class="city">Mannheim</li>
    <li class="city">Augsburg</li>
    <li class="city">Wiesbaden</li>
    <li class="city">Gelsenkirchen</li>
    <li class="city">Mönchengladbach</li>
    <li class="city">Braunschweig</li>
    <li class="city">Chemnitz</li>
    <li class="city">Kiel</li>
    <li class="city">Aachen</li>
    <li class="city">Halle (Saale)</li>
    <li class="city">Magdeburg</li>
    <li class="city">Freiburg im Breisgau</li>
    <li class="city">Krefeld</li>
    <li class="city">Lübeck</li>
    <li class="city">Oberhausen</li>
    <li class="city">Erfurt</li>
    <li class="city">Mainz</li>
    <li class="city">Rostock</li>
    <li class="city">Kassel</li>
    <li class="city">Hagen</li>
    <li class="city">Hamm</li>
    <li class="city">Saarbrücken</li>
    <li class="city">Mülheim an der Ruhr</li>
    <li class="city">Potsdam</li>
    <li class="city">Ludwigshafen am Rhein</li>
    <li class="city">Oldenburg</li>
    <li class="city">Leverkusen</li>
    <li class="city">Osnabrück</li>
    <li class="city">Heidelberg</li>
</ul>
```
The script will be activated when an element with the selector **.SimpleSearchInput** is found. Users can now search for cities and see a list of the found results.


## Options for SimpleSearch

When initializing **SimpleSearch**, you can set various options to customize the search behavior. Here are the available options:

- **`.SimpleSearchInput`**: The CSS selector for the search input field that you use to enter your search queries.

- **`opt`**: An optional object containing various settings for the search function. You can adjust these settings to meet your specific needs:
  - **`page`**: The path to the subpage where the search should be performed. Make sure the path is correctly specified relative to the current page.
  - **`elements`**: The CSS selector for the elements on the subpage that should be searched. For example, `li.city` would search for `li` elements with the `city` class.
  - **`stringLength`**: The minimum length of the search query required to trigger a search. This is set to `2` by default.
  - **`calcScrollTop`**: An offset used for scrolling to the search results. You can adjust this value to change the scroll position when the result is found. The default value is `-200`.
  - **`scroll`**: A boolean value indicating whether to scroll to the search result position on the page when a result is found. The default value is `true`.
  - **`noResults`**: The message displayed when no search results are found. This is set to "No results found!" by default.

By adjusting these options, you can tailor the behavior of **SimpleSearch** to fit your specific needs and provide an optimal search experience for your website's users.


## Standard Styles

```css
.SimpleSearchContainer {
	position: relative;
}

.SimpleSearchContainer .simpleSearchInput {
	width: 100%;
}

.SimpleSearchContainer .SimpleSearchList {
	z-index: 100;
	position: absolute;
	top: 100%;
	width: 100%;
	left: 0;
}

.SimpleSearchContainer .SimpleSearchList li:not(:has(a)),
.SimpleSearchContainer .SimpleSearchList li a {
	padding: .625rem 1.125rem;
	width: 100%;
	color: #fff;
	text-decoration: none;
	background-color: #262D3B;
	display: inline-block;
}

.SimpleSearchContainer .SimpleSearchList li:not(:last-child) {
	border-bottom: .0625rem solid #3a455a;
}

.SimpleSearchContainer .SimpleSearchList li a:hover,
.SimpleSearchContainer .SimpleSearchList li a:focus {
	background-color: #726A5B;
}