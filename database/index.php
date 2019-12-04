<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .response {
            position: absolute;
            left: 0.6%;
            top: 8%;
            height: 300px;
            width: 170px;
            border: 1px solid black;
            overflow-y: auto;
        }

        .list-item {
            width: 100%;
        }

        .list-item:hover {
            background: #aaccff;
            cursor: pointer;
        }

        .authorInfo {
            position: absolute;
            left: 11%;
            top: 8%;
            border: 1px solid black;
            height: 300px;
            width: 600px;
        }

        table {
            width: 100%;
            text-align: center;
        }

        td,
        th {
            border: 1px solid black;
        }

        .auth {
            position: absolute;
            left: 24%;
            top: 3.5%;
        }

        .wrong {
            background: #ffaaaa;
        }

    </style>
</head>

<body>
    <form name="form">
        <p>Wpisz nazwisko autora</p>
        <input type="text" class="query" oninput="showTable()">
    </form>
    <p class="auth">Książki wybranego autora</p>
    <div class="response"></div>
    <div class="authorInfo"></div>
    <script>
        var com = document.querySelector('.query'),
            surnameHolder = document.querySelector('.response'),
            authorInfo = document.querySelector('.authorInfo'),
            listItems = document.querySelectorAll('list-item'),
            tableTitle = document.querySelector('.auth');

        function showTable() {
            var request = new XMLHttpRequest();


            request.onreadystatechange = function() {

                if (this.readyState == 4 && this.status == 200) {

                    surnameHolder.innerHTML = this.responseText;
                }

            };
            request.open('POST', 'response.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('str=' + com.value);
        }

        function showInfo(element) {
            tableTitle.innerHTML = 'Książki autora ' + element.innerHTML;
            var author = new XMLHttpRequest();
            author.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    authorInfo.innerHTML = this.responseText;
                }
            };
            author.open('POST', 'response.php', true);
            author.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            author.send('author=' + element.innerHTML);

        }

    </script>
</body>

</html>
