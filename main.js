function showData() {
    var template = $("#shows").html();
    var shows = {
        "shows": [
            {
                "category": "children",
                "description": "<a href='#'>A show</a> about a cake",
                "title": "Strawberry Shortcake",
            },
            {
                "category": "children",
                "description": "A show about a ice",
                "title": "Vanilla Ice",
            }
        ]
    };
    var html = Mustache.to_html(template, shows);
    $('#target-output').html(html);
}
