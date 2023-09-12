var github = (function() {
    var escapeHtml = function(unsafe) {
        return unsafe.replace(
            /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u00FF]/g,
            c => '&#' + ('000' + c.charCodeAt(0)).slice(-4) + ';'
        );
    }

    var render = function(target, repos) {
        var fragment = '';
        var t = document.getElementById(target);

        for (const repo of repos) {
            var url = repo.html_url;
            var name = repo.name;
            var description = escapeHtml(repo.description || '');

            fragment += '<li><a href="' + url + '">' + name + '</a><p>' + description + '</p></li>';
        }

        t.innerHTML = fragment;
    };

    return {
        showRepos: function(options) {
            fetch("https://api.github.com/users/" + options.user + "/repos?sort=pushed")
                .then(response => response.json())
                .then(function(response) {
                    var repos = [];

                    if (! response) {
                        return;
                    }

                    for (var i = 0; i < response.length; i++) {
                        if (options.skip_forks && response[i].fork) {
                            continue;
                        }

                        repos.push(response[i]);
                    }

                    if (options.count) {
                        repos.splice(options.count);
                    }

                    render(options.id, repos);
                });
        }
    };
})();
