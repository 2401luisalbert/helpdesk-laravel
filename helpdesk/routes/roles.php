<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RolePermissionController;


// Rutas para gestión de roles y permisos (solo accesibles para administradores)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    // Roles
    Route::get('/roles', [RolePermissionController::class, 'indexRoles'])->name('roles.index');
    Route::get('/roles/create', [RolePermissionController::class, 'createRole'])->name('roles.create');
    Route::post('/roles', [RolePermissionController::class, 'storeRole'])->name('roles.store');
    Route::get('/roles/{role}/edit', [RolePermissionController::class, 'editRole'])->name('roles.edit');
    Route::put('/roles/{role}', [RolePermissionController::class, 'updateRole'])->name('roles.update');
    Route::delete('/roles/{role}', [RolePermissionController::class, 'destroyRole'])->name('roles.destroy');
    
    // Permisos
    Route::get('/permissions', [RolePermissionController::class, 'indexPermissions'])->name('permissions.index');
    Route::get('/permissions/create', [RolePermissionController::class, 'createPermission'])->name('permissions.create');
    Route::post('/permissions', [RolePermissionController::class, 'storePermission'])->name('permissions.store');
    Route::get('/permissions/{permission}/edit', [RolePermissionController::class, 'editPermission'])->name('permissions.edit');
    Route::put('/permissions/{permission}', [RolePermissionController::class, 'updatePermission'])->name('permissions.update');
    Route::delete('/permissions/{permission}', [RolePermissionController::class, 'destroyPermission'])->name('permissions.destroy');
    
    // Asignación de roles a usuarios
    Route::get('/user-roles', [RolePermissionController::class, 'indexUserRoles'])->name('user-roles.index');
    Route::get('/user-roles/{user}/edit', [RolePermissionController::class, 'editUserRoles'])->name('user-roles.edit');
    Route::put('/user-roles/{user}', [RolePermissionController::class, 'updateUserRoles'])->name('user-roles.update');
});