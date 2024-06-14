<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CrowdfundingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('5'),
            'title'=>'Gunung Sinabung Meletus',
            'description'=>'Dalam tampilan dramatis kekuatan alam, Gunung Sinabung meletus dengan dahsyat pada hari Selasa, menyemburkan kolom besar abu dan asap setinggi lebih dari 15.000 kaki ke langit. Letusan yang terjadi pada pukul 15:45 waktu setempat, memaksa evakuasi segera desa-desa terdekat dan mendorong pihak berwenang untuk mengeluarkan tingkat peringatan tertinggi. Abu tebal menyelimuti daerah tersebut, mengganggu perjalanan udara dan menimbulkan risiko kesehatan yang signifikan bagi penduduk. Layanan darurat berada dalam kondisi siaga tinggi karena getaran terus mengguncang area tersebut, menimbulkan kekhawatiran akan aktivitas vulkanik lebih lanjut. Ini menandai letusan paling parah dari Gunung Sinabung dalam beberapa tahun terakhir, menarik perhatian global terhadap ketidakstabilan geologis yang sedang berlangsung di wilayah tersebut.',
            'image'=>'/storage/images/meletup.jpg',
            'fund'=>(12000),
            'target'=>(123000),
            'deadline'=> 5,
            'status'=> 1,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Kuta Gugung, Naman Teran, Karo Regency, Sumatera Utara',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('6'),
            'title'=>'Banjir Bandang Tangerang Selatan',
            'description'=>'Banjir besar melanda Tangerang Selatan pada Rabu pagi setelah hujan deras mengguyur kawasan itu selama lebih dari 12 jam. Ribuan rumah terendam air setinggi satu hingga dua meter, memaksa ribuan penduduk mengungsi ke tempat yang lebih aman. Jalan-jalan utama tidak dapat dilalui, menyebabkan kemacetan lalu lintas yang parah dan mengganggu aktivitas sehari-hari. Tim penyelamat dan relawan dikerahkan untuk membantu evakuasi dan mendistribusikan bantuan kepada korban banjir. Pihak berwenang telah mengumumkan keadaan darurat dan memperingatkan warga untuk tetap waspada terhadap kemungkinan banjir susulan. Kejadian ini menyoroti masalah drainase yang kronis di wilayah tersebut dan mendesak tindakan segera untuk pencegahan bencana di masa depan.',
            'image'=>'/storage/images/banjir.jpg',
            'fund'=>(200000),
            'target'=>(400000),
            'status'=> 1,
            'deadline'=> 6,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Tangerang Selatan',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('3'),
            'title'=>'Kebakaran Hutan Bandung Utara',
            'description'=>'Kebakaran hutan hebat melanda wilayah Bandung Utara pada Kamis sore, menghanguskan ratusan hektar lahan hutan dan memaksa evakuasi penduduk setempat. Api yang dipicu oleh cuaca panas ekstrem dan angin kencang, dengan cepat menyebar, menimbulkan kepulan asap tebal yang mengganggu kualitas udara di daerah sekitarnya. Tim pemadam kebakaran bekerja tanpa henti untuk mengendalikan kobaran api, sementara pihak berwenang memperingatkan warga untuk menghindari area yang terkena dampak. Sejumlah rumah dan fasilitas umum dilaporkan rusak akibat kebakaran tersebut. Hingga saat ini, belum ada laporan korban jiwa, namun kerugian materiil diperkirakan sangat besar. Insiden ini kembali menyoroti perlunya langkah-langkah pencegahan yang lebih ketat untuk mengurangi risiko kebakaran hutan di masa depan.',
            'image'=>'/storage/images/bakar.jpg',
            'fund'=>0,
            'target'=>(100000),
            'deadline'=> 3,
            'status'=> 0,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Bandung Utara',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('4'),
            'title'=>'Gempa Bumi Kota Emas',
            'description'=>'Gempa bumi berkekuatan 6,8 skala Richter mengguncang Kota Emas pada Jumat dini hari, menyebabkan kerusakan luas dan kepanikan di kalangan penduduk. Getaran kuat yang berlangsung sekitar 30 detik tersebut merobohkan bangunan, merusak infrastruktur, dan menyebabkan aliran listrik terputus di banyak daerah. Ribuan warga terpaksa meninggalkan rumah mereka dan mengungsi ke tempat yang lebih aman. Tim SAR dan relawan segera dikerahkan untuk melakukan evakuasi dan penyelamatan, sementara rumah sakit setempat kewalahan menangani korban luka-luka. Pihak berwenang memperingatkan adanya potensi gempa susulan dan mendesak masyarakat untuk tetap waspada. Bencana ini menimbulkan keprihatinan akan kesiapsiagaan dan mitigasi bencana di wilayah tersebut, mendorong seruan untuk peningkatan upaya pencegahan dan penanganan darurat.',
            'image'=>'/storage/images/gempa1.jpg',
            'fund'=>0,
            'target'=>(100000000),
            'deadline'=> 3,
            'status'=> 0,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Kota Emas',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('7'),
            'title'=>'Banjir Bandang Kota Jakarta Utara',
            'description'=>'Banjir besar melanda Jakarta Utara pada Senin pagi setelah hujan deras mengguyur ibu kota selama lebih dari 24 jam tanpa henti. Air setinggi lebih dari dua meter menggenangi ribuan rumah dan fasilitas umum, memaksa ribuan warga mengungsi ke tempat penampungan sementara. Jalan-jalan utama dan akses transportasi lumpuh total, menyebabkan kemacetan parah dan menghambat evakuasi serta distribusi bantuan. Tim penyelamat dan relawan bekerja keras mengevakuasi warga yang terjebak dan menyediakan kebutuhan dasar seperti makanan dan air bersih. Pihak berwenang telah mengeluarkan status darurat dan meminta bantuan nasional untuk menangani bencana ini. Kejadian ini menggarisbawahi perlunya perbaikan sistem drainase dan upaya mitigasi banjir yang lebih efektif di Jakarta Utara, untuk mencegah terulangnya tragedi serupa di masa depan.',
            'image'=>'/storage/images/banjir1.jpg',
            'fund'=>(200000),
            'target'=>(400000),
            'deadline'=> 3,
            'status'=> 1,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Jakarta Utara',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('5'),
            'title'=>'Gempa Bumi Desa Jarilo',
            'description'=>'Gempa bumi berkekuatan 7,2 skala Richter mengguncang Desa Jarilo pada Rabu malam, menghancurkan bangunan dan menimbulkan kepanikan di kalangan penduduk. Getaran kuat yang berlangsung sekitar 40 detik itu merobohkan banyak rumah dan fasilitas umum, serta memicu tanah longsor di beberapa area perbukitan di sekitarnya. Ribuan warga terpaksa mengungsi ke tempat yang lebih aman, sementara tim penyelamat dan relawan segera dikerahkan untuk melakukan operasi pencarian dan penyelamatan. Beberapa jalan utama tertutup puing-puing, menghambat upaya evakuasi dan distribusi bantuan. Hingga saat ini, dilaporkan sejumlah korban luka-luka dan kerugian material yang sangat besar. Pihak berwenang memperingatkan adanya potensi gempa susulan dan mendesak warga untuk tetap waspada. Tragedi ini menggarisbawahi pentingnya kesiapsiagaan dan respons cepat dalam menghadapi bencana alam di wilayah tersebut.',
            'image'=>'/storage/images/gempa2.jpg',
            'fund'=>0,
            'target'=>(500000),
            'status'=> 0,
            'deadline'=> 3,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Desa Jarilo, Kabupaten Kenangan, Jawa Tengah',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
    }
}
