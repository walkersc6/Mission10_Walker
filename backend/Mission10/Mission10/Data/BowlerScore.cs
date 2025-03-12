using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mission10.Models;

public partial class BowlerScore
{
    [Key]
    public int MatchId { get; set; }
    [Key]
    public short GameNumber { get; set; }

    public int BowlerId { get; set; }

    public short? RawScore { get; set; }

    public short? HandiCapScore { get; set; }

    public bool WonGame { get; set; }

    public virtual Bowler Bowler { get; set; } = null!;
}
