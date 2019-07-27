export interface RedisAdapterInterface {
    Connect(conn: RedisConnectionInterface): any;
    Exec(cmd: RedisCommandInterface)
}

export interface RedisConnectionInterface {
    server: string
    port: number
    database: number
}

export interface RedisCommandInterface {
    AddArgument(argument: string)
    GetCommandString()
}
