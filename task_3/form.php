<?php

if (empty($_POST['name'])) {
    header("HTTP/1.1 400 Name is not set");
    exit();
}
if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    header("HTTP/1.1 400 Mail is not set or is invalid");
    exit();
}
if (!isset($_POST['year'])) {
    header("HTTP/1.1 400 Year is not set");
    exit();
}
if (!isset($_POST['limbs'])) {
    header("HTTP/1.1 400 Limbs number is not set");
    exit();
}
if (!isset($_POST['gender']) || ($_POST['gender']!=0 && $_POST['gender']!=1)) {
    header("HTTP/1.1 400 Gender is not set or is invalid");
    exit();
}


$user = 'u53012';
$pass = '2656986';
$db = new PDO('mysql:host=localhost;dbname=u53012', $user, $pass, [PDO::ATTR_PERSISTENT => true]);

try {
  $stmt = $db->prepare("INSERT INTO Person (p_name, mail, year, gender, limbs_num, biography) VALUES (:name, :mail, :year, :gender, :limbs_num, :biography);");
  $stmtErr =  $stmt -> execute(['name' => $_POST['name'],'mail' => $_POST['email'] , 'year' => $_POST['year'], 'gender' => $_POST['gender'], 'limbs_num' => $_POST['limbs'], 'biography' => $_POST['biography']]);
  if (!$stmtErr) {
      header("HTTP/1.1 500 Some server issue");
      exit();
  }
  $strId = $db->lastInsertId();
  if (isset($_POST['powers'])) {
        foreach ($_POST['powers'] as $item) {
            switch ($item) {
                case "Invincibility":
                    $stmt = $db->prepare("INSERT INTO Person_Ability (p_id, a_id) VALUES (:p_id, :a_id);");
                    $stmtErr = $stmt->execute(['p_id' => intval($strId), 'a_id' => 1]);
                    break;
                case "Noclip":
                    $stmt = $db->prepare("INSERT INTO Person_Ability (p_id, a_id) VALUES (:p_id, :a_id);");
                    $stmtErr = $stmt->execute(['p_id' => intval($strId), 'a_id' => 3]);
                    break;
                case "Levitation":
                    $stmt = $db->prepare("INSERT INTO Person_Ability (p_id, a_id) VALUES (:p_id, :a_id);");
                    $stmtErr = $stmt->execute(['p_id' => intval($strId), 'a_id' => 2]);
                    break;
            }
            if (!$stmtErr) {
                header("HTTP/1.1 500 Some server issue");
                exit();
            }
        }
  }
}
catch(PDOException $e){
    header("HTTP/1.1 500 Some server issue");
    //print('Error : ' . $e->getMessage());
    exit();
}