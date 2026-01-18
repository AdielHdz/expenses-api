import { DataSource } from 'typeorm';
import { Expense } from '../../modules/expenses/entities/expense.entity';
import { Seeder } from 'typeorm-extension';

export class ExpensesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const expenseRepository = dataSource.getRepository(Expense);

    const expenses: Partial<Expense>[] = [
      {
        description: 'Groceries at supermarket',
        amount: 850,
        category: 'Food',
      },
      { description: 'Electricity bill', amount: 1200, category: 'Utilities' },
      { description: 'Internet service', amount: 650, category: 'Utilities' },
      { description: 'Gasoline', amount: 900, category: 'Transport' },
      { description: 'Lunch at restaurant', amount: 320, category: 'Food' },
      { description: 'Coffee', amount: 80, category: 'Food' },
      { description: 'Movie tickets', amount: 260, category: 'Entertainment' },
      { description: 'Gym membership', amount: 700, category: 'Health' },
      { description: 'Pharmacy purchase', amount: 430, category: 'Health' },
      { description: 'Uber ride', amount: 180, category: 'Transport' },

      {
        description: 'Streaming subscription',
        amount: 199,
        category: 'Entertainment',
      },
      { description: 'Water bill', amount: 400, category: 'Utilities' },
      { description: 'Mobile phone bill', amount: 550, category: 'Utilities' },
      { description: 'Fast food dinner', amount: 210, category: 'Food' },
      { description: 'Office supplies', amount: 350, category: 'Work' },
      { description: 'Parking fee', amount: 120, category: 'Transport' },
      { description: 'Car maintenance', amount: 1500, category: 'Transport' },
      { description: 'Clothing purchase', amount: 980, category: 'Shopping' },
      { description: 'Online course', amount: 1200, category: 'Education' },
      { description: 'Books', amount: 540, category: 'Education' },

      { description: 'Breakfast', amount: 110, category: 'Food' },
      { description: 'Taxi', amount: 230, category: 'Transport' },
      { description: 'Home cleaning supplies', amount: 410, category: 'Home' },
      { description: 'Pet food', amount: 600, category: 'Pets' },
      { description: 'Veterinary visit', amount: 950, category: 'Pets' },
      { description: 'Birthday gift', amount: 700, category: 'Gifts' },
      { description: 'Haircut', amount: 250, category: 'Personal Care' },
      { description: 'Laundry service', amount: 300, category: 'Home' },
      { description: 'Snacks', amount: 95, category: 'Food' },
      {
        description: 'Music subscription',
        amount: 129,
        category: 'Entertainment',
      },

      { description: 'Dinner with friends', amount: 680, category: 'Food' },
      { description: 'Bakery purchase', amount: 145, category: 'Food' },
      { description: 'Monthly rent', amount: 8500, category: 'Housing' },
      { description: 'Home maintenance', amount: 1250, category: 'Home' },
      { description: 'Light bulbs and tools', amount: 320, category: 'Home' },
      { description: 'Bus tickets', amount: 90, category: 'Transport' },
      { description: 'Car wash', amount: 180, category: 'Transport' },
      { description: 'Insurance payment', amount: 2100, category: 'Finance' },
      { description: 'Bank commission', amount: 75, category: 'Finance' },
      {
        description: 'Cloud storage subscription',
        amount: 99,
        category: 'Technology',
      },

      { description: 'Software license', amount: 499, category: 'Technology' },
      {
        description: 'Keyboard replacement',
        amount: 890,
        category: 'Technology',
      },
      { description: 'Doctor appointment', amount: 700, category: 'Health' },
      { description: 'Dental checkup', amount: 1100, category: 'Health' },
      { description: 'Protein supplements', amount: 650, category: 'Health' },
      { description: 'Notebook and stationery', amount: 210, category: 'Work' },
      {
        description: 'Coworking space day pass',
        amount: 300,
        category: 'Work',
      },
      { description: 'Online services fee', amount: 180, category: 'Services' },
      { description: 'Event ticket', amount: 950, category: 'Entertainment' },
      { description: 'Board game', amount: 720, category: 'Entertainment' },
    ];

    await expenseRepository.insert(expenses);

    console.log('✅ Expenses seeder executed');
  }
}
