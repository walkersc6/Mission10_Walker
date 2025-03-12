//set up the template for the data received
export type bowler = {
    bowlerId: number;
    bowlerFirstName: string;
    bowlerMiddleInit?: string; //? because it is nullable
    bowlerLastName: string;
    teamName: string;    
    bowlerAddress: string;
    bowlerCity: string;
    bowlerState: string;
    bowlerZip: string;
    bowlerPhoneNumber: string;

}