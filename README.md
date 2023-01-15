# verableopsAssignment

The assgnment is coded on express framework using NodeJs, and MongoDB as the DB.

There are 6 APIs

createBusinesses - Creates the business entity 
createOperator - Creates the operator entity
createJobForBusiness - Creates a job and links its owner to the business that the job belongs to.
getAllJobForBusiness - Gets all the jobs for a businessId
createOps - creates an Ops entity where a operator is assigned a job and the same is refelected in their schedule.
getSchedulesForOperator - returns the schedules for a operator, given their operatorID.

The details can be found in the postman collection.

the project can be initialised by following the steps-
Go to project directory
1. npm install - generates node_modules
2. npm start - starts the project in port 8000

