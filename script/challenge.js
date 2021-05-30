

window.onload = function() {

    // This variable stores the object information about all the employees.
    var employees;

    var mainDOM = document.getElementsByTagName("main");

    fetchFile();

    // fetches the information from the API portal.
    // As I need to display information about all the team members
    // I would be fetching information from the server using this
    // API endpoint: http://sandbox.bittsdevelopment.com/code1/fetchemployees.php
    function fetchFile(){

        var xhr;

        //CREATE A NEW REQUEST OBJECT
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){

            if (xhr.readyState == 4 ) {//readyState OF 4 means server response is fine

                //any result code between 200 and 299 represents success
                //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
                if (xhr.status >= 200 && xhr.status < 300) {
                    jsonData = xhr.responseText; //The file content is in JSON format
                    //console.log(jsonData);

                    //JSON.parse() convert the JSON data into a JavaScript object
                    employees = JSON.parse(jsonData);

                    //Once data has been successfully fetched from the server, display the data.
                    displayData();

                }

                //HANDLE THE ERROR
                else {
                    alert("Connection was unsuccessful");
                }

            }//end if readyState
        }

        xhr.open("GET","http://sandbox.bittsdevelopment.com/code1/fetchemployees.php",true);
        xhr.send(null);

    }

    //This function displays the data on the html page.
    function displayData(){

        var content = '';

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
        for (const property in employees) {

            content += '<section class="employee">';

            if (`${employees[property].employeeisfeatured}`==1) {
                content += '<p class="icon">&#128081;</p>';
            }

            //displays the image
            content += '<img src="http://sandbox.bittsdevelopment.com/code1/employeepics/' + property + '.jpg">'

            //displays the name
            content += '<h2 class="name">' + `${employees[property].employeefname}` + ' ' +
                     `${employees[property].employeelname}` + '</h2>';

            //displays the biography
            content += '<p class="bio">' + `${employees[property].employeebio}` + '</p>';

            //displays the role assigned to each member using a for loop.
            content += '<p class="roles">'
            for (const roleID in employees[property].roles) {

                content += '<span class="role" style="background-color:' + employees[property].roles[roleID].rolecolor
                            + ';">' + employees[property].roles[roleID].rolename + ' </span>';
            }

            content += '<p>';

            content += '</section>';

        }

        mainDOM[0].innerHTML = content;

    }


}