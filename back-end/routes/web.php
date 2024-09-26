<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/a',function(){
    return 'hello';
});
require __DIR__.'/auth.php';
