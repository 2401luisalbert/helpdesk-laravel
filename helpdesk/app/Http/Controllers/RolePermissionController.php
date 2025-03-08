<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RolePermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role:admin']);
    }

    // Mostrar todos los roles
    public function indexRoles()
    {
        $roles = Role::with('permissions')->get();
        return view('admin.roles.index', compact('roles'));
    }

    // Mostrar formulario para crear un rol
    public function createRole()
    {
        $permissions = Permission::all();
        return view('admin.roles.create', compact('permissions'));
    }

    // Guardar un nuevo rol
    public function storeRole(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'required|array',
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')
            ->with('success', 'Rol creado exitosamente');
    }

    // Mostrar formulario para editar un rol
    public function editRole(Role $role)
    {
        $permissions = Permission::all();
        $rolePermissions = $role->permissions->pluck('id')->toArray();
        
        return view('admin.roles.edit', compact('role', 'permissions', 'rolePermissions'));
    }

    // Actualizar un rol
    public function updateRole(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,'.$role->id,
            'permissions' => 'required|array',
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')
            ->with('success', 'Rol actualizado exitosamente');
    }

    // Eliminar un rol
    public function destroyRole(Role $role)
    {
        if($role->name === 'admin'){
            return redirect()->route('roles.index')
                ->with('error', 'No se puede eliminar el rol de administrador');
        }
        
        $role->delete();
        
        return redirect()->route('roles.index')
            ->with('success', 'Rol eliminado exitosamente');
    }

    // Mostrar todos los permisos
    public function indexPermissions()
    {
        $permissions = Permission::all();
        return view('admin.permissions.index', compact('permissions'));
    }

    // Mostrar formulario para crear un permiso
    public function createPermission()
    {
        return view('admin.permissions.create');
    }

    // Guardar un nuevo permiso
    public function storePermission(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:permissions,name',
        ]);

        Permission::create(['name' => $request->name]);

        return redirect()->route('permissions.index')
            ->with('success', 'Permiso creado exitosamente');
    }

    // Mostrar formulario para editar un permiso
    public function editPermission(Permission $permission)
    {
        return view('admin.permissions.edit', compact('permission'));
    }

    // Actualizar un permiso
    public function updatePermission(Request $request, Permission $permission)
    {
        $request->validate([
            'name' => 'required|unique:permissions,name,'.$permission->id,
        ]);

        $permission->update(['name' => $request->name]);

        return redirect()->route('permissions.index')
            ->with('success', 'Permiso actualizado exitosamente');
    }

    // Eliminar un permiso
    public function destroyPermission(Permission $permission)
    {
        $permission->delete();
        
        return redirect()->route('permissions.index')
            ->with('success', 'Permiso eliminado exitosamente');
    }

    // Mostrar usuarios con sus roles
    public function indexUserRoles()
    {
        $users = User::with('roles')->get();
        return view('admin.user-roles.index', compact('users'));
    }

    // Mostrar formulario para asignar roles a un usuario
    public function editUserRoles(User $user)
    {
        $roles = Role::all();
        $userRoles = $user->roles->pluck('id')->toArray();
        
        return view('admin.user-roles.edit', compact('user', 'roles', 'userRoles'));
    }

    // Actualizar roles de un usuario
    public function updateUserRoles(Request $request, User $user)
    {
        $request->validate([
            'roles' => 'required|array',
        ]);

        $user->syncRoles($request->roles);

        return redirect()->route('user-roles.index')
            ->with('success', 'Roles de usuario actualizados exitosamente');
    }
}