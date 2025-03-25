import { Size, SizeName } from 'src/pizza/entities/size.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class SizeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const sizeRepository = dataSource.getRepository(Size);

    const sizes: SizeName[] = [
      SizeName.SMALL,
      SizeName.MEDIUM,
      SizeName.LARGE,
      SizeName.EXTRA_LARGE,
    ];

    for (const size of sizes) {
      const existingSize = await sizeRepository.findOne({
        where: { name: size },
      });

      if (!existingSize) {
        await sizeRepository.save({ name: size });
      }
    }
  }
}
