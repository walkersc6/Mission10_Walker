using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mission10.Models;

public partial class ZtblWeek
{
    [Key]
    public DateOnly WeekStart { get; set; }

    public DateOnly? WeekEnd { get; set; }
}
