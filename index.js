var github = (function() {
    var escapeHtml = function(string) {
        return $('<div/>').text(string).html();
    };
    var escapeHtml = function(unsafe) {
        return unsafe.replace(
            /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u00FF]/g,
            c => '&#' + ('000' + c.charCodeAt(0)).slice(-4) + ';'
        );
    }

    var render = function(target, repos) {
        var fragment = '';
        var t = $(target)[0];

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
            $.ajax({
                url: "https://api.github.com/users/" + options.user + "/repos?sort=pushed&callback=?",
                dataType: 'jsonp',
                error: function (err) {
                    $(options.target + ' li.loading').addClass('error').text("Error loading feed");
                },
                success: function(data) {
                    var repos = [];

                    if (! data || ! data.data) {
                        return;
                    }

                    for (var i = 0; i < data.data.length; i++) {
                        if (options.skip_forks && data.data[i].fork) {
                            continue;
                        }

                        repos.push(data.data[i]);
                    }

                    if (options.count) {
                        repos.splice(options.count);
                    }

                    render(options.target, repos);
                },
            });
        }
    };
})();
