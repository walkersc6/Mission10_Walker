using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission10.Models;
using SQLitePCL;

namespace Mission10.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BowlerController : ControllerBase
    {
        private BowlingLeagueContext _bowlerContext;

        public BowlerController(BowlingLeagueContext temp)
        {
            _bowlerContext = temp;
        }

        [HttpGet(Name = "GetBowler")]
        public IEnumerable<Bowler> Get()
        {
            //get the bowlers in the Marlins and Sharks teams only
            var bowlerList = _bowlerContext.Bowlers
                .Where(x => x.Team.TeamName == "Marlins" || x.Team.TeamName == "Sharks")
                .Include(x => x.Team)
                .ToList();

            return (bowlerList);
        }
    }
}
