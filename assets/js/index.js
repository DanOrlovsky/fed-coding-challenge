/* 

index.js
02/03/18 - BASIC FUNCTIONALITY
Dan Orlovsky
Ally Coding Challenge
*/

var indexPage = {
    setEventListeners: function() {
        $('.tablinks').on('click', this.changeTab);
    },
    // callApi 
    // params: 
    //      uri - target uri
    //      method - any ajax method available
    //      callback - function to send the data to
    // description:
    //      Makes an ajax call and returns data through a callback.
    //      es6 return new Promise((resolve, reject) => {})
    callApi: function(uri, method, callback) {
        $.ajax({
            url: uri,
            method: method,
            dataType: 'json',
            success: function(data) {
                callback(data);
            },
            error: function(err) {
                callback(err);
            }
        })
    },
    // buildRateTable 
    // params: 
    //      data - data to populate table with
    //      element - jquery element is expected i.e. buildRateTable()
    // description:
    //      Builds out the rate table for the UI
    buildRateTable: function(data, element) {
        var tableRows = [];
        data.forEach(function(current) {
            // pushes a new html row into our array.
            tableRows.push('<tr><td>' + current.name + '</td><td>' + 
                            current.apy + '</td><td>$' + current.earnings + '</td></tr>');
        })
        element.append(tableRows);
    },

    changeTab: function() {
        // Get the button that called the function
        var button = $(this);
        // If we clicked a tab that's already active, we bail
        if(button.hasClass('active')) return;
        // Gets the id of the tab we will be showing.
        var tabId = $(this).data('tabid');
        // Remove current active states
        $(".tablinks.active").removeClass("active");
        $(".tabcontent.active").removeClass("active");

        // Add active states to the new tabs
        button.addClass('active');
        $("#" + tabId).addClass('active');

    },

    // initPage 
    // description:
    //      Gets core information important to the initial display of the page
    initPage: function() {
        this.callApi('code-test.json', 'GET', function(data) {
            // Sorts data by descending apy.
            data.sort(function(a, b) {
                return b.apy - a.apy;
            });
            indexPage.buildRateTable(data, $('tbody#rate-table-body'));
        })
    },
};  
// function() 
// entrypoint 
(function() {
    $(document).ready(function() { 
        indexPage.initPage();
        indexPage.setEventListeners();
    })
})();