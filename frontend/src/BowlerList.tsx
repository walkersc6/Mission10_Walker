import { useEffect, useState } from "react";
import { bowler } from "./types/bowler";

function BowlerList() {
    const [bowlers, setBowlers] = useState<bowler[]>([]);

    //fetch the data
    useEffect(() => {
        const fetchBowlers = async () => {
            const response = await fetch('https://localhost:5000/Bowler');
            const data = await response.json();
            //The returned data is formatted weird
            //This gets the first bowler and their members without missing anyone

            // Initialize an empty array for all the bowlers
            let bowlersArray: bowler[] = [];

            // 1. Process the main $values array (standalone bowlers)
            //Get the bowlers that stick out from their members in the returned data
            if (data && Array.isArray(data.$values)) {
                data.$values.forEach((entry: any) => {
                    // Check if the entry has a team and bowlers
                    if (entry.team) {
                        const teamName = entry.team.teamName;

                        // Add the standalone bowler data (without team info) if there is no team
                        if (entry.bowlerFirstName && entry.bowlerLastName) {
                            if (teamName) {
                                bowlersArray.push({
                                    ...entry, //all the properties of that bowler
                                    teamName: teamName // Assign the correct team name to the bowler
                                });
                            } else {
                                bowlersArray.push({
                                    ...entry, //all the properties of that bowler
                                    teamName: "No Team" // Mark as having no team if not part of a team
                                });
                            }
                        }

                        // Add bowlers from the team
                        if (entry.team.bowlers && Array.isArray(entry.team.bowlers.$values)) { //check to see if the array is an array
                            entry.team.bowlers.$values.forEach((bowler: any) => {
                                if (bowler.hasOwnProperty('$ref')) {
                                    // Skip the random skip objects in the returned data
                                    return;
                                }

                                // Add the team name to the bowler
                                bowlersArray.push({
                                    ...bowler, // all the properties of that bowler
                                    teamName: teamName // Add the team name to the bowler
                                });
                            });
                        }
                    }
                });
            }

            // print the bowlersArray to the log
            console.log("Final bowlers array:", bowlersArray);

            // get rid of the ones without a team
            setBowlers(bowlersArray.filter((b) => b.teamName !== "No Team"));
        };

        fetchBowlers();
    }, []);

    return (
        <>
            {/* Display the bowler data in a table */}
            <table>
                <thead>
                    <tr>
                        <th>Bowler Name</th>
                        <th>Team Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Check to see if there are bowlers */}
                    {bowlers.length === 0 ? (
                        <tr>
                            <td colSpan={7}>No bowlers found.</td>
                        </tr>
                    ) : (
                        //map out Bowlers and print all necessary info
                        bowlers.map((b) => (
                            <tr key={b.bowlerId}>
                                <td>{b.bowlerFirstName} {b.bowlerMiddleInit} {b.bowlerLastName}</td>
                                <td>{b.teamName}</td>
                                <td>{b.bowlerAddress}</td>
                                <td>{b.bowlerCity}</td>
                                <td>{b.bowlerState}</td>
                                <td>{b.bowlerZip}</td>
                                <td>{b.bowlerPhoneNumber}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

export default BowlerList;