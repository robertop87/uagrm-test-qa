@baseUrl @baseUrl-examples
Scenario: Make a payment to a bill provider
    And The json request data
    """json
    {
        "amount": "133.0",
        "TransactionDate": "01-09-2016" 
    }
    """
    And the property "TransactionDate" is a date "3" days in the future
    When I make a POST request to "/payments/v1.0"
    Then the response status code should be "200"
    And the response property "data.results[0].status" should be "Pending"