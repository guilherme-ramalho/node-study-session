import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class user1611598712828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
            length: '50',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            length: '100',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}

export default user1611598712828;
