export const BINDINGS = {
  App: Symbol.for('App'),
  Controllers: Symbol.for('Controllers'),
  BotProvider: Symbol.for('BotProvider'),
  IConfigService: Symbol.for('IConfigService'),
  ILogger: Symbol.for('ILogger'),
  IApiService: Symbol.for('IApiService'),
};

export const STEAM_BINDINGS = {
  SteamController: Symbol.for('SteamController'),
  ISteamService: Symbol.for('ISteamService'),
};

export const START_BINDINGS = {
  StartController: Symbol.for('StartController'),
  IStartService: Symbol.for('IStartService'),
};
