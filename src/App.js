import { Console, Random } from "@woowacourse/mission-utils";

class App {
  async run() {
    const MESSAGES = {
      GETNAME:
        "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n",
      NAME_LEN_ERROR: "[ERROR] 자동차 이름은 1~5자 사이여야 합니다.",
      GETTRYCNT: "시도할 횟수는 몇 회인가요?\n",
      TRYCNT_RANGE_ERROR: "[ERROR] 시도 횟수는 1 이상의 숫자여야 합니다.",
    };

    /** 자동차 이름 받기 */
    const getCarNames = async () => {
      const input = await Console.readLineAsync(MESSAGES.GETNAME);
      const carNames = input.split(",").map((name) => name.trim());
      checkCarNames(carNames);
      return carNames;
    };

    /** 자동차 이름 검증 */
    const checkCarNames = (names) => {
      if (names.some((name) => name.length > 5 || !name)) {
        throw new Error(MESSAGES.NAME_LEN_ERROR);
      }
    };

    /** 시도 횟수 입력 */
    const getTryCount = async () => {
      const input = await Console.readLineAsync(MESSAGES.GETTRYCNT);
      const tryCount = parseInt(input, 10);
      checkTryCnt(tryCount);
      return tryCount;
    };

    /** 시도 횟수 검증 */
    const checkTryCnt = (cnt) => {
      if (isNaN(cnt) || cnt <= 0) {
        throw new Error(MESSAGES.TRYCNT_RANGE_ERROR);
      }
    };

    /** 이동하기 */
    const moveCars = (cars) => {
      cars.forEach((car) => {
        const randNum = Random.pickNumberInRange(0, 9);
        if (randNum >= 4) {
          car.position++;
        }
      });
    };

    /** 자동차 상태 출력 */
    const printCars = (cars) => {
      cars.forEach((car) => {
        Console.print(`${car.name} : ${"-".repeat(car.position)}`);
      });
      Console.print("");
    };

    /** 우승자 출력 */
    const printWinners = (cars) => {
      const max = Math.max(...cars.map((car) => car.position));
      const win = cars
        .filter((car) => car.position === max)
        .map((car) => car.name);
      Console.print(`최종 우승자 : ${win.join(", ")}`);
    };

    const racingGame = async () => {
      try {
        const carNames = await getCarNames();
        const tryCount = await getTryCount();

        const cars = carNames.map((name) => ({ name, position: 0 }));
        Console.print("\n실행 결과");

        for (let i = 0; i < tryCount; i++) {
          moveCars(cars);
          printCars(cars);
        }

        // 우승자 출력
        printWinners(cars);
      } catch (error) {
        Console.print(error.message);
        throw error;
      }
    };

    await racingGame();
  }
}

export default App;
