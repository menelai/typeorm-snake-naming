import {NamingStrategyInterface, Table} from 'typeorm';
import {SnakeNamingStrategy as StnS} from 'typeorm-naming-strategies';

export class SnakeNamingStrategy extends StnS implements NamingStrategyInterface {
  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const tableName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce((name, column) => `${name}__${column}`, `${tableName}`);
    return `pk__${name}`.slice(0, 63);
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[], referencedTablePath?: string): string {
    const tableName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce((name, column) => `${name}__${column}`, `${tableName}__${referencedTablePath}`);
    return `fk__${name}`.slice(0, 63);
  }
}
