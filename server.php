<?php

calculateAndWrite();

function calculateAndWrite() {
    $script_start_time = microtime(true);
    $x = (float) $_POST["x"];
    $y = (float) $_POST["y"];
    $r = (float) $_POST["r"];
    $result = calculate($x, $y, $r) ? "Hit" : "Miss";
    $current_time = $_POST["time"];
    $script_end_time = microtime(true);
    $benchmark = number_format($script_end_time - $script_start_time, 10) . "s";
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