<?php

calculateAndWrite();

function calculateAndWrite() {
    $script_start_time = microtime(true);
    $x = (float) $_POST["x"];
    $y = (float) $_POST["y"];
    $r = (float) $_POST["r"];
    if (validate($x, $y, $r)) {
        $result = calculate($x, $y, $r) ? "Hit" : "Miss";
        $current_time = $_POST["time"];
        $script_end_time = microtime(true);
        $benchmark = number_format(($script_end_time - $script_start_time) * 1000, 10) . "ms";
        $table = "<div>
            <table>
                <tr>
                    <td>$x</td>
                    <td>$y</td>
                    <td>$r</td>
                    <td>$result</td>
                    <td>$current_time</td>
                    <td>$benchmark</td>
                </tr>
            </table>
        </div>";
        echo $table;
    } else {
        http_response_code(422);
    }
}

function calculate($x, $y, $r) {
    if ($x >= 0) {
        return $y >= 0 && ($x ** 2 + $y ** 2) <= (($r / 2) ** 2);
    }
    if ($y >= 0 ) {
        return $y <= $x / 2 + $r / 2;
    }
    return $x >= -$r && $y >= -$r;
}

function validate($x, $y, $r) {
    return validateX($x) && validateY($y) && validateR($r);
}

function validateX($x) {
    return in_array($x, array(-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2));
}
function validateY($y) {
    return is_numeric($y) && ($y > -5 && $y < 5);
}
function validateR($r) {
    return in_array($r, array(1, 2, 3, 4, 5));
}