import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class alterUserAddAvatar1611680544103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'picture',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'picture');
  }
}

export default alterUserAddAvatar1611680544103;
