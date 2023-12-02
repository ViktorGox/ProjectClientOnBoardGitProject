# Functional design

- [Introduction](./functional-design.md#introduction)
- [Requirements](./functional-design.md#requirements)
  - [Business](./functional-design.md#business)
  - [User](./functional-design.md#user)
  - [System](./functional-design.md#system)
    - [Functional](./functional-design.md#functional)
    - [Non-functional](./functional-design.md#non-functional)

## Introduction

The Functional Design document outlines the necessary functionalities and requirements for our testing and management system's development. This document is a comprehensive guide meant to benefit stakeholders, developers, and testers involved in the project. By carefully defining requirements and incorporating wireframes, this document ensures the meticulous planning vital for building a resilient and user-friendly system.

# Requirements

## Business

| Requirement                                                                                                                     | MSCW | Source    |
|---------------------------------------------------------------------------------------------------------------------------------|------|-----------|
| The system must be easy to use and easy to understand so we don’t have to spend time explaining to new employees.               | M    | Interview |
| The system should be error-free so that it will not slow down our company’s progress or even damage our profit.                 | M    | Document  |
| The system should be accessible and user-friendly on mobile devices to enable users to perform essential tasks while on the go. | M    | Document  |
| The system must be ready for future growth, accommodating evolving business needs and the addition of more employees.           | M    | Interview |

## User

| Requirement                                                                                                                                            | MSCW | Source    |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|------|-----------|
| As a tester, I want to mark tests as blockers so that I can highlight serious bugs.                                                                    | M    | Interview |
| As a developer, I want to assign weights to tests so that overall test effort can be estimated.                                                        | M    | Document  |
| As a manager, I want new boards to set up when old ones close so that new sprints can be started seamlessly.                                           | M    | Document  |
| As a Developer and a Manager, we want to add columns in boards so that I can categorize test cases.                                                    | M    | Document  |
| As a Manager, I want to set due dates for tests so that test execution has clear timelines.                                                            | M    | Document  |
| As a Manager, I want to edit user roles so that access can be controlled efficiently.                                                                  | M    | Interview |
| As a user, I want to see an overview of current tests so that I can get the big picture.                                                               | M    | Interview |
| As an Admin, I want to edit added tests to fix any errors.                                                                                             | M    | Interview |
| As an Admin, I want to be able to add test cases so that we can test new features.                                                                     | M    | Document  |
| As a User, I want to search tests by names so that I can access them faster.                                                                           | M    | Document  |
| As a tester, I want to receive notification about overdue tests so that I can prioritize my work.                                                      | M    | Document  |
| As a tester, I want to receive notification about upcoming tests so that I can prepare and allocate time.                                              | M    | Document  |
| As a manager, I want immediate notifications about blocking bugs so that critical issues can be addressed urgently.                                    | M    | Interview |
| As an admin, I want to be able to assign and unassign people from test cases.                                                                          | M    | Interview |
| As a tester, I want to be able to add comments on test cases so that I can keep track of progress.                                                     | M    | Interview |
| As a tester, I want to be able to generate reports containing information about tests completed so far for this sprint and/or including older sprints. | M    | Interview |
| As a tester, I want to be able to attach files to test case logs so that we can use images and videos to be more descriptive.                          | S    | Interview |
| As a tester, I want to be able to change the status of the test case so that we can organize better.                                                   | M    | Interview |


## System

### Functional

| Requirement                                                                                                                                                                                 | MSCW | Source              |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|---------------------|
| The system must notify testers about tests that have passed their due date.                                                                                                                 | M    | Document            |
| The system must notify testers about tests that are due soon.                                                                                                                               | M    | Document            |
| The system must immediately send a notification upon detecting a blocking issue.                                                                                                            | M    | Interview           |
| The system must allow sorting tests by weight per column.                                                                                                                                   | S    | Document            |
| The system must generate reports on the completion status of regression test runs per sprint and product, including details on tests, testers, failed/passed tests, time taken, and weight. | S    | Interview           |
| The system must save data when a board is closed to be included in reports later.                                                                                                           | M    | Document, Interview |
| Access to test data and configurations should be role-based, ensuring that users only have access to information relevant to their roles.                                                   | M    | Document, Interview |
| The system must allow searching of tests by name.                                                                                                                                           | S    | Document            |

### Non-functional

| Requirement                                                                                                                                                                                                      | MSCW | Source              |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|---------------------|
| The system must ensure the confidentiality, integrity, and availability of all data and transactions. It must comply with GDPR legislation and prevent unauthorized access, modification, or disclosure of data. | M    | Document            |
| The system should be designed to accommodate the company's future growth in terms of features, functionalities, and data storage capacity.                                                                       | M    | Document            |
| The system must be able to integrate with other systems or platforms used by the company, such as accounting and inventory management systems.                                                                   | M    | Interview           |
| The system must be easy to use and navigate for all employees, regardless of their technical skill level. It must have a user-friendly interface with clear and concise instructions.                            | M    | Interview           |
| The system should be available 96.67% of the time.                                                                                                                                                               | M    | Document            |
| The system must be compatible with different web browsers, operating systems, and devices, such as desktops, laptops, tablets, and mobile phones.                                                                | M    | Interview, Document |
| The system must be able to recover from failure within 10 minutes without data loss or disruption of service.                                                                                                    | M    | Interview           |
| The system should be easily maintainable, allowing updates and bug fixes to be implemented without causing downtime or loss of data.                                                                             | M    | Interview           |
