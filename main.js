const teams = [
  { id: "1A", group: 1 },
  { id: "1B", group: 1 },
  { id: "1C", group: 1 },
  { id: "1D", group: 1 },
  { id: "2A", group: 2 },
  { id: "2B", group: 2 },
  { id: "2C", group: 2 },
  { id: "2D", group: 2 },
  { id: "3A", group: 3 },
  { id: "3B", group: 3 },
  { id: "3C", group: 3 },
  { id: "3D", group: 3 },
  { id: "4A", group: 4 },
  { id: "4B", group: 4 },
  { id: "4C", group: 4 },
  { id: "4D", group: 4 },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createPairs(teams) {
  const pairs = [];
  const remainingTeams = [...teams];

  while (remainingTeams.length > 1) {
    let team1 = remainingTeams.pop();
    let paired = false;
    for (let i = 0; i < remainingTeams.length; i++) {
      if (remainingTeams[i].group !== team1.group) {
        let team2 = remainingTeams.splice(i, 1)[0];
        pairs.push([team1, team2]);
        paired = true;
        break;
      }
    }
    if (!paired) {
      remainingTeams.unshift(team1);
      shuffle(remainingTeams);
    }
  }

  if (remainingTeams.length > 0) {
    return createPairs(teams);
  }

  return pairs;
}

function simulateMatch(pair) {
  return pair[Math.floor(Math.random() * 2)];
}

function playoffRound(teams) {
  let pairs = createPairs(teams);
  let winners = pairs.map((pair) => simulateMatch(pair));
  return winners;
}

function simulatePlayoff(teams) {
  let currentTeams = [...teams];
  let rounds = ["8th final", "quarterfinal", "semifinal", "final"];

  for (let round of rounds) {
    console.log(`\n--- ${round.toUpperCase()} ---`);
    if (currentTeams.length === 0) {
      console.log("No teams left to compete.");
      return;
    }

    let numberOfMatches = currentTeams.length / 2;
    let matches = [];

    for (let i = 0; i < numberOfMatches; i++) {
      matches.push(currentTeams.slice(i * 2, i * 2 + 2));
    }

    let winners = [];
    for (let match of matches) {
      let winner = simulateMatch(match);
      winners.push(winner);
      console.log(`${match[0].id} vs ${match[1].id} => Winner: ${winner.id}`);
    }

    currentTeams = winners;
  }

  if (currentTeams.length > 0) {
    console.log(`\nChampion: ${currentTeams[0].id}`);
  } else {
    console.log("No champion could be determined.");
  }
}

simulatePlayoff(teams);
