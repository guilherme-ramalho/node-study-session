import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

class alterUserProviderId1611602034153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointment', 'provider');

    await queryRunner.addColumn(
      'appointment',
      new TableColumn({
        name: 'providerId',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'appointment',
      new TableForeignKey({
        name: 'AppointmentFK',
        columnNames: ['providerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointment', 'AppointmentFK');

    await queryRunner.dropColumn('appointment', 'providerId');

    await queryRunner.addColumn(
      'appointment',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      })
    );
  }
}

export default alterUserProviderId1611602034153;
