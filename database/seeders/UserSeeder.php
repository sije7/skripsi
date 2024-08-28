<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // \App\Models\User::factory(30)->create();

        DB::table('users')->insert(([
            'name'=>'admin',
            'role'=>'admin',
            'email'=>'admin@gmail.com',
            'password'=>bcrypt('a'),
            'remember_token'=>'1231231231',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'profile_image'=>'/storage/images/Money.png',
            'no_req'=>'6043340633',
            'lokasi'=>'',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'deskripsi'=> '',
            'nik'=>'3171001234560001',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]));

        DB::table('users')->insert([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => bcrypt('u'),
            'remember_token'=>'4123132',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'role'=>'user',
            'profile_image'=>'/storage/images/Money.png',
            'no_req'=>'6043340633',
            'lokasi'=>'',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'nik'=>'3172002345670002',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]);

        DB::table('users')->insert([
            'name' => 'Ervindo',
            'email' => 'ervindo@gmail.com',
            'password' => bcrypt('ervindo!2'),
            'remember_token'=>'1231231',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'role'=>'user',
            'profile_image'=>'/storage/images/chainsaw.jpg',
            'no_req'=>'6043340633',
            'lokasi'=>'',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'nik'=>'3173003456780003',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]);

        DB::table('users')->insert([
            'name' => 'Christian',
            'email' => 'christian@gmail.com',
            'password' => bcrypt('christian!2'),
            'remember_token'=>'8312398',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'role'=>'admin',
            'profile_image'=>'/storage/images/ANto.jpeg',
            'no_req'=>'6043340633',
            'lokasi'=>'',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'nik'=>'3174004567890004',
            'deskripsi'=>'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
        ]);

        //lembaga
        DB::table('users')->insert([
            'name' => 'Lembaga Kami Bisa',
            'email' => 'lembaga@gmail.com',
            'password' => bcrypt('l'),
            'remember_token'=>'831239812',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'850937366470',
            'role'=>'lembaga',
            'profile_image'=>'/storage/images/Learn.png',
            'no_req'=>'7359356462',
            'lokasi'=>'Jl. Kelapa Dua Raya, Klp. Dua, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'nik'=>'3175005678900005',
            'deskripsi'=> 'Lembaga Kami Bisa adalah sebuah lembaga sosial yang berdedikasi untuk meningkatkan kesejahteraan komunitas dan mendorong perubahan positif melalui dukungan yang terarah dan program inovatif. Misi kami mencakup penyediaan layanan penting seperti pendidikan, kesehatan, dan bantuan bencana kepada populasi yang kurang terlayani.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.2334006,
            'longitude'=>106.6129862
        ]);
        DB::table('users')->insert([
            'name' => 'Teach For Tangerang',
            'email' => 'tfg@email',
            'password' => bcrypt('tfg'),
            'remember_token'=>'415859113509',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'021 534 5830 ',
            'role'=>'lembaga',
            'profile_image'=>null,
            'no_req'=>'4242368494',
            'lokasi'=>'Tangerang, RT.001/RW.009, West Panunggangan, Cibodas, Tangerang City, Banten 15138',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'nik'=>'3176006789010006',
            'deskripsi'=> 'Teach For Tangerang adalah lembaga sosial yang berdedikasi untuk memberdayakan komunitas dan menciptakan perubahan positif melalui program-program unggulan dan dukungan yang berkelanjutan. Kami fokus pada penyediaan layanan vital seperti pendidikan, kesehatan, dan bantuan darurat bagi mereka yang paling membutuhkan.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.2196666,
            'longitude'=>106.6178827
        ]);

        DB::table('users')->insert([
            'name' => 'Yayasan Peduli Nusa',
            'email' => 'yayasanpedulinusa@email',
            'password' => bcrypt('yayasan'),
            'remember_token'=>'831239812',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'450882444502',
            'role'=>'lembaga',
            'profile_image'=>null,
            'no_req'=>'3446533190',
            'lokasi'=>'Jl. Raya Kb. Jeruk No.6, RT.4/RW.2, Kb. Jeruk, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530',
            'penanggung_jawab'=>'',
            'bank'=>'Mandiri',
            'status'=> 1,
            'nik'=>'3177007890120007',
            'deskripsi'=> 'Yayasan Peduli Nusa adalah organisasi sosial yang berkomitmen untuk meningkatkan kualitas hidup masyarakat melalui bantuan yang terarah dan program berkelanjutan. Kami menyediakan layanan penting seperti pendidikan, kesehatan, dan bantuan darurat, khususnya bagi mereka yang terdampak bencana alam.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.2001653,
            'longitude'=>106.7694922
        ]);

        DB::table('users')->insert([
            'name' => 'Lembaga Amal Bersatu',
            'email' => 'amalbersatu@email',
            'password' => bcrypt('amal'),
            'remember_token'=>'831239812',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'169457612774',
            'role'=>'lembaga',
            'profile_image'=>null,
            'no_req'=>'1497030987',
            'lokasi'=>'Gg. Swadaya I 6-51, RT.10/RW.1, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430',
            'penanggung_jawab'=>'',
            'bank'=>'BRI',
            'status'=> 1,
            'nik'=>'3178008901230008',
            'deskripsi'=> 'Lembaga Amal Bersatu berkomitmen untuk memberikan dukungan yang komprehensif kepada komunitas yang kurang terlayani di seluruh Indonesia. Fokus kami meliputi pendidikan, pelayanan kesehatan, dan tanggap darurat bencana.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.2862342,
            'longitude'=>106.8073101
        ]);
        DB::table('users')->insert([
            'name' => 'Solidaritas',
            'email' => 'solidaritaskemanusiaan@email',
            'password' => bcrypt('solidaritas'),
            'remember_token'=>'831239812',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'303836759377',
            'role'=>'lembaga',
            'profile_image'=>null,
            'no_req'=>'9139197881',
            'lokasi'=>'Jl. Cemara Raya No.57, RT.006/RW.006A, Jakasampurna, Kec. Bekasi Bar., Kota Bks, Jawa Barat 17145',
            'penanggung_jawab'=>'',
            'bank'=>'BNI',
            'status'=> 1,
            'nik'=>'3179009012340009',
            'deskripsi'=> 'Solidaritas adalah organisasi nirlaba yang bekerja untuk mengatasi ketidaksetaraan dan memberikan bantuan kepada mereka yang terkena dampak bencana alam. Kami menyediakan layanan vital seperti pendidikan, kesehatan, dan bantuan darurat.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.2472195,
            'longitude'=>106.9748707
        ]);

        //disabled
        DB::table('users')->insert([
            'name' => 'Yayasan Harapan Bangsa',
            'email' => 'yayasanharapanbangsa@email',
            'password' => bcrypt('solidaritas'),
            'remember_token'=>'831239812',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'744009595320',
            'role'=>'lembaga',
            'profile_image'=>null,
            'no_req'=>'5683522993',
            'lokasi'=>'Gg. Anggrek 4, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
            'penanggung_jawab'=>'Ervind',
            'bank'=>'BCA',
            'status'=> 0,
            'nik'=>'3170100123450010',
            'npwp'=>'0012345678901000',
            'deskripsi'=> 'Yayasan Harapan Bangsa adalah lembaga sosial yang berfokus pada pemberdayaan masyarakat melalui program pendidikan, kesehatan, dan bantuan darurat. Kami berkomitmen untuk membantu mereka yang terkena dampak bencana alam dan krisis lainnya.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.5613886,
            'longitude'=>107.7698097
        ]);
        DB::table('users')->insert([
            'name' => 'Rumah Peduli Sesama',
            'email' => 'rumahpeduli@email',
            'password' => bcrypt('solidaritas'),
            'remember_token'=>'831239812',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'992920762277',
            'role'=>'lembaga',
            'profile_image'=>null,
            'no_req'=>'6505135850',
            'lokasi'=>'Jl. Jend. Sudirman 18-20, Kupang, Kec. Ambarawa, Kabupaten Semarang, Jawa Tengah 50612',
            'penanggung_jawab'=>'Sije',
            'bank'=>'Panin',
            'status'=> 0,
            'nik'=>'3171101234560011',
            'npwp'=>'0123456789012345',
            'deskripsi'=> 'Rumah Peduli Sesama adalah organisasi nirlaba yang berdedikasi untuk membantu masyarakat yang kurang beruntung dan korban bencana alam. Kami menyediakan berbagai layanan, termasuk pendidikan, kesehatan, dan bantuan darurat.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-7.2546615,
            'longitude'=>110.4124696
        ]);


        DB::table('users')->insert([
            'name' => 'Danielson',
            'email' => 'danielson7632@gmail.com',
            'password' => bcrypt('d'),
            'remember_token'=>'831239812',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'021 534 5830 ',
            'role'=>'lembaga',
            'profile_image'=>null,
            'no_req'=>'6043340633',
            'lokasi'=>'Jl. Kebon Jeruk Raya No. 27, Kebon Jeruk, Jakarta Barat, 11530, INDONESIA',
            'penanggung_jawab'=>'Daniel',
            'bank'=>'BCA',
            'status'=> 0,
            'nik'=>'3175005678900005',
            'npwp'=>'0234567890123456',
            'deskripsi'=> 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.2003229,
            'longitude'=>106.7805351
        ]);



    }
}
