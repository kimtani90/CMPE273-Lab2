var mongoose     = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cmpe273', options); // connect to our database

function connectionPool(){


    List<connection> availableConnections = new ArrayList<connection>();

    public JdbcConnectionPool()
    {
        initializeConnectionPool();
    }

    private void initializeConnectionPool()
    {
        while(!checkIfConnectionPoolIsFull())
        {
            availableConnections.add(createNewConnectionForPool());
        }
    }

    private synchronized boolean checkIfConnectionPoolIsFull()
    {
        final int MAX_POOL_SIZE = Configuration.getInstance().DB_MAX_CONNECTIONS;

        if(availableConnections.size() < MAX_POOL_SIZE)
        {
            return false;
        }

        return true;
    }
}