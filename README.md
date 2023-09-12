# github-repo-list-snippet

A JavaScript snippet to include your Github repository list on a page.


## Usage

Add div or another HTML tag with an id attribute in this example we'll use `gh_repos`.

```html
<div id="gh_repos"></div>
```

Then add the following code after your page has been loaded like so;

```js
document.addEventListener("DOMContentLoaded", function() {
    github.showRepos({
        user: 'YOUR_GITHUB_USERNAME',
        count: 10,
        skip_forks: true,
        id: 'gh_repos'
    });
});
```

## Options

| Option     | Type         | Useage                                         |
| :---:      | :---:        | :---:                                          |
| user       | String       | Your Github username                           |
| count      | Number       | The number of repos to list                    |
| skip_forks | Boolean      | Skip fork repos if true                        |
| id         | HtmlIdAttr   | The Html Element to render repo list inside of |
