<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UploadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('uploads')->insert([
            'user_id'=>'5',
            'subcategory_id'=>'1',
            'title'=>'Mengatasi Banjir: Strategi untuk Ketangguhan Bencana',
            'upload_video'=>'/storage/videos/Sosialisasi Cara Penanggulangan Bencana Banjir.mp4',
            'title_description'=>'Banjir',
            'description'=>'Indonesia sering mengalami banjir akibat kondisi geografis dan iklimnya. Langkah-langkah penanggulangan yang efektif meliputi sistem peringatan dini untuk memberi tahu masyarakat rentan, membangun infrastruktur tahan banjir, dan mengadakan latihan banjir secara berkala untuk memastikan kesiapsiagaan. Setelah banjir, manajemen penyakit seperti kolera dan leptospirosis menjadi penting. Tindakan segera meliputi penyediaan air bersih, sanitasi yang memadai, dan pemeriksaan kesehatan untuk mencegah wabah dan mengurangi risiko kesehatan di kalangan populasi yang terkena dampak.',
            'upload_image'=>'/storage/images/floodp.jpg',
            'thumbnail'=>'/storage/images/banjirup.jpg',
            'status'=>1,
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
        ]);
        DB::table('uploads')->insert([
            'user_id'=>'6',
            'subcategory_id'=>'3',
            'title'=>'Erupsi Gunung Api: Mengurangi Risiko dan Memastikan Kesehatan',
            'upload_video'=>'/storage/videos/Edukasi Penanggulangan Bencana Gunung Meletus.mp4',
            'title_description'=>'Gunung Meletus',
            'description'=>'Dengan banyaknya gunung berapi aktif, Indonesia rentan terhadap letusan gunung berapi yang membahayakan masyarakat. Langkah-langkah penanggulangan meliputi sistem pemantauan gunung berapi untuk mendeteksi tanda-tanda awal letusan, menyusun rencana evakuasi, dan membangun tempat perlindungan yang tahan bencana di zona aman. Manajemen dampak kesehatan selama kejadian gunung berapi meliputi penyediaan perlindungan pernapasan, mendirikan pusat evakuasi dilengkapi fasilitas medis, dan melaksanakan surveilans penyakit untuk mencegah penyakit pernapasan dan masalah kesehatan lainnya yang diperparah oleh abu vulkanik dan gas.',
            'upload_image'=>'/storage/images/Volcanic-alert_icons.jpg',
            'thumbnail'=>'/storage/images/volc.jpg',
            'status'=>1,
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
        ]);

        DB::table('uploads')->insert([
            'user_id'=>'6',
            'subcategory_id'=>'4',
            'title'=>'Menghadapi Tanah Longsor: Langkah Pencegahan dan Perlindungan',
            'upload_video'=>'/storage/videos/MItigasi Bencana dan Kesiapsiagaan Tanah Longsor.mp4',
            'title_description'=>'Tanah Longsor',
            'description'=>'Indonesia sering mengalami tanah longsor, terutama di daerah pegunungan dan perbukitan akibat curah hujan tinggi dan kondisi tanah yang labil. Langkah pencegahan yang efektif meliputi reboisasi, pembuatan terasering pada lahan miring, dan pemasangan sistem drainase yang baik untuk mengurangi risiko longsor. Setelah terjadi tanah longsor, langkah perlindungan kesehatan meliputi evakuasi korban ke tempat yang aman, penyediaan air bersih dan sanitasi di tempat pengungsian, serta layanan kesehatan untuk mencegah penyakit infeksi seperti diare dan penyakit kulit yang sering muncul akibat kondisi lingkungan yang tidak higienis dan stres psikologis. Selain itu, penting juga untuk memberikan dukungan psikososial kepada korban bencana untuk membantu pemulihan mental mereka.',
            'upload_image'=>'/storage/images/05122017-siaga-bencana-tanah-longsor-1.jpg',
            'thumbnail'=>'/storage/images/landslide.jpg',
            'status'=>0,
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
        ]);

        DB::table('uploads')->insert([
            'user_id'=>'7',
            'subcategory_id'=>'2',
            'title'=>'Kesiapsiagaan Gempa Bumi dan Manajemen Kesehatan Pasca',
            'upload_video'=>'/storage/videos/Edukasi Penanggulangan Bencana Gunung Meletus.mp4',
            'title_description'=>'Gempa Bumi',
            'description'=>'Gempa bumi adalah bencana alam yang umum terjadi di Indonesia, sering kali menyebabkan kerusakan luas dan risiko kesehatan. Langkah-langkah persiapan meliputi penerapan ketat kode bangunan untuk struktur tahan gempa, melakukan latihan gempa bumi, dan mengembangkan rencana respons bencana berbasis masyarakat. Pasca gempa bumi, fokus pada promosi kebersihan, memastikan akses air bersih dan fasilitas sanitasi yang memadai, serta menerapkan kontrol vektor menjadi krusial untuk mencegah wabah penyakit seperti penyakit diare dan penyakit menular yang disebarkan oleh nyamuk seperti demam berdarah.',
            'upload_image'=>'/storage/images/tec1.jpg',
            'thumbnail'=>'/storage/images/tec.jpg',
            'status'=>1,
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
        ]);

        DB::table('uploads')->insert([
            'user_id'=>'5',
            'subcategory_id'=>'6',
            'title'=>'Pencegahan dan Penanganan Diare setelah Bencana Alam',
            'upload_video'=>'/storage/videos/Kata Dokter_ Bolak Balik Kamar Mandi Karena Diare, Begini Cara Mudah Atasinya.mp4',
            'title_description'=>'Diare',
            'description'=>'Setelah bencana alam seperti banjir dan gempa bumi, penyakit diare sering kali menjadi masalah kesehatan utama di Indonesia. Langkah pencegahan mencakup penyediaan air bersih melalui distribusi air minum yang aman dan penggunaan filter air. Sanitasi yang memadai, termasuk fasilitas toilet yang bersih dan pemrosesan limbah yang tepat, sangat penting untuk mencegah kontaminasi lingkungan. Edukasi masyarakat tentang praktik kebersihan, seperti mencuci tangan dengan sabun, juga berperan besar dalam mencegah diare. Penanganan diare meliputi pemberian oralit untuk mengatasi dehidrasi, pemeriksaan dan pengobatan medis di klinik darurat, serta pengawasan berkelanjutan untuk mendeteksi dan mengendalikan wabah. Distribusi makanan yang aman dan bergizi di tempat pengungsian juga penting untuk menjaga kesehatan dan mencegah diare lebih lanjut.',
            'upload_image'=>'/storage/images/998f858f1144a13c2140f8eb03f385bf.png',
            'thumbnail'=>'/storage/images/towfiqu-barbhuiya-xs2rdwVoqks-unsplash.jpg',
            'status'=>1,
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
        ]);
    }
}
