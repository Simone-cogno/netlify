const qs = require('querystring');
const yahooFinance = require('yahoo-finance2').default; // NOTE the .default
const _ = require('lodash');

const structure = {
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
    }
}


exports.handler = async (event) => {
    const query = qs.parse(event.rawQuery);

    let  results = await yahooFinance.quoteSummary('AAPL', {
        modules: ["balanceSheetHistory", "incomeStatementHistory"]
    });

    const incomeStatement = results.incomeStatementHistory.incomeStatementHistory.map(item => _.pick(item, [

    ]))

    return {
        statusCode: 200,
        body: JSON.stringify(results.balanceSheetHistory.balanceSheetStatements)
    };
};