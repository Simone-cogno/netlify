const qs = require('querystring');
const yahooFinance = require('yahoo-finance2').default; // NOTE the .default
const _ = require('lodash');

const quoteSummaryStructure = {
    incomeStatementHistory: {
        maxAge: "maxAge",
        endDate: "endDate",
        totalRevenue: "totalRevenue",
        costOfRevenue: "costOfRevenue",
        grossProfit: "grossProfit",
        researchDevelopment: "researchDevelopment",
        sellingGeneralAdministrative: "sellingGeneralAdministrative",
        nonRecurring: "nonRecurring",
        otherOperatingExpenses: "otherOperatingExpenses",
        totalOperatingExpenses: "totalOperatingExpenses",
        operatingIncome: "operatingIncome",
        totalOtherIncomeExpenseNet: "totalOtherIncomeExpenseNet",
        ebit: "ebit",
        interestExpense: "interestExpense",
        incomeBeforeTax: "incomeBeforeTax",
        incomeTaxExpense: "incomeTaxExpense",
        minorityInterest: "minorityInterest",
        netIncomeFromContinuingOps: "netIncomeFromContinuingOps",
        discontinuedOperations: "discontinuedOperations",
        extraordinaryItems: "extraordinaryItems",
        effectOfAccountingCharges: "effectOfAccountingCharges",
        otherItems: "otherItems",
        netIncome: "netIncome",
        netIncomeApplicableToCommonShares: "netIncomeApplicableToCommonShares",
    },
    "defaultKeyStatistics": {
        "maxAge": "maxAge",
        "priceHint": "priceHint",
        "enterpriseValue": "enterpriseValue",
        "forwardPE": "forwardPE",
        "profitMargins": "profitMargins",
        "floatShares": "floatShares",
        "sharesOutstanding": "sharesOutstanding",
        "sharesShort": "sharesShort",
        "sharesShortPriorMonth": "sharesShortPriorMonth",
        "sharesShortPreviousMonthDate": "sharesShortPreviousMonthDate",
        "dateShortInterest": "dateShortInterest",
        "sharesPercentSharesOut": "sharesPercentSharesOut",
        "heldPercentInsiders": "heldPercentInsiders",
        "heldPercentInstitutions": "heldPercentInstitutions",
        "shortRatio": "shortRatio",
        "shortPercentOfFloat": "shortPercentOfFloat",
        "impliedSharesOutstanding": "impliedSharesOutstanding",
        "category": "category",
        "bookValue": "bookValue",
        "priceToBook": "priceToBook",
        "fundFamily": "fundFamily",
        "legalType": "legalType",
        "lastFiscalYearEnd": "lastFiscalYearEnd",
        "nextFiscalYearEnd": "nextFiscalYearEnd",
        "mostRecentQuarter": "mostRecentQuarter",
        "netIncomeToCommon": "netIncomeToCommon",
        "trailingEps": "trailingEps",
        "pegRatio": "pegRatio",
        "lastSplitFactor": "lastSplitFactor",
        "enterpriseToRevenue": "enterpriseToRevenue",
        "enterpriseToEbitda": "enterpriseToEbitda",
        "52WeekChange": "52WeekChange",
        "SandP52WeekChange": "SandP52WeekChange"
      }
};


exports.handler = async (event) => {
    const query = qs.parse(event.rawQuery);

    if(query.ticker == null){
        return {
            statusCode: 200,
            body: JSON.stringify({})
        };
    }

    //https://github.com/gadicc/node-yahoo-finance2/blob/HEAD/docs/modules/quote.md
    const quote = await yahooFinance.quote(query.ticker);
    const quoteSummary = await yahooFinance.quoteSummary(query.ticker, { modules: [ "defaultKeyStatistics" ] });
    const defaultKeyStatistics = quoteSummary.defaultKeyStatistics;

    console.log(quote);
    console.log(quote.trailingAnnualDividendYield * 100);
    console.log(defaultKeyStatistics[quoteSummaryStructure.defaultKeyStatistics.pegRatio]);
    console.log(defaultKeyStatistics[quoteSummaryStructure.defaultKeyStatistics.enterpriseToEbitda]);

    let dividendYield = ("" + quote.trailingAnnualDividendYield).replace('.', ',');
    let pegRatio = defaultKeyStatistics[quoteSummaryStructure.defaultKeyStatistics.pegRatio];
    let enterpriseToEbitda = defaultKeyStatistics[quoteSummaryStructure.defaultKeyStatistics.enterpriseToEbitda];

    return {
        statusCode: 200,
        body: JSON.stringify({
            ticket: query.ticker,
            dividendYield,
            pegRatio,
            enterpriseToEbitda
        })
    };
};