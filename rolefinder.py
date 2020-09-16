import sys
import cassiopeia as cass
from cassiopeia import Summoner, Champion
from roleidentification import pull_data
from roleidentification.utilities import get_champion_roles, get_team_roles

def main():
    champion_roles = pull_data()
    cass.set_riot_api_key('RGAPI-0c500f09-462b-4fdd-a32a-3c6a30589f7d')

    match = cass.CurrentMatch(summoner = Summoner(name=sys.argv[1], region="NA"), region="NA")

    roles = get_team_roles(match.blue_team, champion_roles)
    print({role.name: champion.name for role, champion in roles.items()})
    
    roles = get_team_roles(match.red_team, champion_roles)
    print({role.name: champion.name for role, champion in roles.items()})


        
if __name__ == "__main__":
    main()