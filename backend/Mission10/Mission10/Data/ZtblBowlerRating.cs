using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mission10.Models;

public partial class ZtblBowlerRating
{
    [Key]
    public string BowlerRating { get; set; } = null!;

    public short? BowlerLowAvg { get; set; }

    public short? BowlerHighAvg { get; set; }
}
