using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mission10.Models;

public partial class MatchGame
{
    [Key]
    public int MatchId { get; set; }
    [Key]
    public short GameNumber { get; set; }

    public int? WinningTeamId { get; set; }

    public virtual TourneyMatch Match { get; set; } = null!;
}
