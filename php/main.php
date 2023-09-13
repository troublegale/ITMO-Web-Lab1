<?php
$x = (float) $_POST["xbox"];
$y = (float) $_POST["y_input"];
$r = (float) $_POST["rbox"];

if ($x >= 0) {
    if ($y >= 0) {
        if ($x ** 2 + $y ** 2 <= ($r/2) ** 2) {
            echo "yes";
        } else {
            echo "no";
        }
    } else {
        echo "no";
    }
} else {
    if ($y >= 0) {
        if ($y <= 1/2 * 2 + 1/2 * $r) {
            echo "yes";
        }
    }
    else {
        if ($x >= -$r && $y >= -$r) {
            echo "yes";
        } else {
            echo "no";
        }
    }
}
