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

    if(query.ticker == null){
        return {
            statusCode: 200,
            body: JSON.stringify({})
        };
    }

    const quote = await yahooFinance.quote(query.ticker);


    console.log(quote);
    console.log(quote.trailingAnnualDividendYield * 100);

    return {
        statusCode: 200,
        body: JSON.stringify({
            ticket: query.ticker,
            dividendYield: quote.trailingAnnualDividendYield
        })
    };
};