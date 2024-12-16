// 문제 풀이 데이터를 가져오기
function getProblemsData() {
    const problemsData = localStorage.getItem("problemsData");
    return problemsData ? JSON.parse(problemsData) : [];
}

// 유저 점수 데이터 가져오기
function calculateUserRankings() {
    const problemsData = getProblemsData();
    const userScores = {};

    // 문제 풀이 데이터를 기반으로 점수 계산
    problemsData.forEach(entry => {
        const { username, isCorrect } = entry;
        if (!userScores[username]) {
            userScores[username] = 0;
        }
        if (isCorrect) {
            userScores[username] += 1; // 정답일 경우 점수 추가
        }
    });

    // 점수를 배열로 변환 후 정렬
    const rankingArray = Object.keys(userScores).map(username => ({
        username,
        score: userScores[username]
    }));
    rankingArray.sort((a, b) => b.score - a.score); // 점수 내림차순 정렬

    // 순위 계산
    let currentRank = 1;
    rankingArray.forEach((user, index) => {
        if (index > 0 && user.score === rankingArray[index - 1].score) {
            // 동점자 처리: 이전 사용자와 점수가 같으면 같은 순위
            user.rank = rankingArray[index - 1].rank;
        } else {
            // 점수가 다르면 새로운 순위 부여
            user.rank = currentRank;
        }
        currentRank++;
    });

    return rankingArray;
}

// 랭킹 테이블 표시
function displayRanking() {
    const rankingTable = document.getElementById("ranking-table");
    const rankings = calculateUserRankings();

    // 테이블 초기화
    rankingTable.innerHTML = "";

    rankings.forEach(user => {
        const row = document.createElement("tr");

        const rankCell = document.createElement("td");
        rankCell.textContent = user.rank; // 동점자 처리된 순위 표시

        const usernameCell = document.createElement("td");
        usernameCell.textContent = user.username;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = user.score;

        row.appendChild(rankCell);
        row.appendChild(usernameCell);
        row.appendChild(scoreCell);

        rankingTable.appendChild(row);
    });
}

// 초기 실행
displayRanking();