<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserRole extends Pivot
{
    // Define any additional attributes or methods if needed for the pivot table
    protected $table = 'role_permission'; // Specify the table name
}
