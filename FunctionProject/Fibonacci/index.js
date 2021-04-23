var bigInt = require("big-integer");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let nth = req.query.nth;
  let nth_1 = bigInt.one;
  let nth_2 = bigInt.zero;
  let answer = bigInt.zero;
  let memoMap = new Map();

  let memo = function (n) {
    if (n == 0) {
      memoMap.set(0, nth_2);
      return (answer = nth_2);
    }
    if (n == 1) {
      memoMap.set(1, nth_1);
      return (answer = nth_1);
    }
    if (!memoMap.has(n)) {
      memoMap.set(n, memo(n - 1).add(memo(n - 2)));
    }
    return memoMap.get(n);
  };

  if (nth < 0) throw "must be greater than 0";
  else {
    if (memoMap.has(nth)) {
      answer = memoMap.get(nth);
    } else {
      answer = memo(nth);
    }
  }

  context.res = {
    body: answer.toString(),
  };
};

/* SIN MEMORIZACIÓN
var bigInt = require("big-integer");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let nth = req.query.nth;
  let nth_1 = bigInt.one;
  let nth_2 = bigInt.zero;
  let answer = bigInt.zero;

  if (nth < 0) throw "must be greater than 0";
  else if (nth === 0) answer = nth_2;
  else if (nth === 1) answer = nth_1;
  else {
    for (var i = 0; i < nth - 1; i++) {
      answer = nth_2.add(nth_1);
      nth_2 = nth_1;
      nth_1 = answer;
    }
  }

  context.res = {
    body: answer.toString(),
  };
};
*/
