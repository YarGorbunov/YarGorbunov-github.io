<head>
    <title>Задание 6</title>
    <link rel="stylesheet" href="styleadmin.css">
    <meta name="viewport" content="width=device-width initial-scale=1">
</head>
<body>
<?php
/**
 * Задача 6. Реализовать вход администратора с использованием
 * HTTP-авторизации для просмотра и удаления результатов.
 **/

function authorize() {
    header('HTTP/1.1 401 Unanthorized');
    header('WWW-Authenticate: Basic realm="My site"');
    print('<h1>401 Требуется авторизация</h1>');
    exit();
}

// Пример HTTP-аутентификации.
// PHP хранит логин и пароль в суперглобальном массиве $_SERVER.
// Подробнее см. стр. 26 и 99 в учебном пособии Веб-программирование и веб-сервисы.
if (empty($_SERVER['PHP_AUTH_USER']) ||
    empty($_SERVER['PHP_AUTH_PW'])) {
  authorize();
}
$user = 'u53012';
$pass = '2656986';
$db = new PDO('mysql:host=localhost;dbname=u53012', $user, $pass, [PDO::ATTR_PERSISTENT => true]);
$stmt = $db->prepare("SELECT * FROM Admin;");
$stmtErr = $stmt->execute();
$admins = $stmt->fetchAll(PDO::FETCH_ASSOC);
$isAdmin = false;
foreach ($admins as $admin){
    if ($admin['login'] == $_SERVER['PHP_AUTH_USER'] && $admin['pass'] == md5($_SERVER['PHP_AUTH_PW'])) {
        $isAdmin = true;
        break;
    }
}
if (!$isAdmin) {
    authorize();
}

if ($_SERVER['REQUEST_METHOD']=="GET") {
    if (!empty($_GET['delete'])) {
        $stmt = $db->prepare("DELETE FROM Person_Ability WHERE p_id=:p_id;");
        $stmtErr = $stmt->execute(['p_id' => $_GET['delete']]);
        $stmt = $db->prepare("DELETE FROM Person WHERE p_id=:p_id;");
        $stmtErr = $stmt->execute(['p_id' => $_GET['delete']]);
        header('Location: ./admin.php');
    }
    print('Вы успешно авторизовались и видите защищенные паролем данные.');

    $stmt = $db->prepare("SELECT * FROM Person ORDER BY p_id;");
    $stmtErr = $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $db->prepare("SELECT * FROM Person_Ability ORDER BY p_id;");
    $stmtErr = $stmt->execute();
    $resultAbility = $stmt->fetchAll(PDO::FETCH_ASSOC);

    print ('<table>
	<thead>
		<tr>
			<td>ID</td>
			<td>Имя</td>
			<td>Почта</td>
			<td>Год рождения</td>
			<td>Пол</td>
			<td>Количество конечностей</td>
			<td>Биография</td>
			<td>Логин</td>
			<td>Хеш пароля</td>
			<td>Способности</td>
			<td>Удалить</td>
		</tr>
	</thead>
	<tbody>');

    foreach ($result as $person) {
        print ('<tr>');
        foreach ($person as $key => $value) {
            if ($key=="gender") print ('<td>' . ($value=="0" ? "Муж" : "Жен") . '</td>');
            else print('<td>' . $value . '</td>');
        }
        print ('<td>');
        foreach ($resultAbility as $personAbility) {
            if ($personAbility['p_id'] == $person['p_id']){
                switch ($personAbility['a_id']) {
                    case 1:
                        print ('Невидимость ');
                        break;
                    case 3:
                        print ('Ходить сквозь стены ');
                        break;
                    case 2:
                        print ('Левитация ');
                        break;
                }
            }
        }
        print ('</td>');
        print ('<td><a href="./admin.php?delete=' . $person['p_id'] . '">Удалить данные</a></td>');
        print ('</tr>');
    }
    print ('</tbody>
    </table>');

    $stmt = $db->prepare("SELECT COUNT(1), a_id FROM Person_Ability GROUP BY a_id;");
    $stmtErr = $stmt->execute();
    $statistics = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($statistics as $statistic) {
        print ('<p>' . $statistic['COUNT(1)'] . ' человек обладают ');
        switch ($statistic['a_id']) {
            case 1:
                print ('невидимостью ');
                break;
            case 3:
                print ('хождением сквозь стены ');
                break;
            case 2:
                print ('левитацией ');
                break;
        }
        print ('</p>');
    }

} else {

}

