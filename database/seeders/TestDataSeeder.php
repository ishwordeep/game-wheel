<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // settings
        DB::table("settings")->insert([
            [
                "name" => "Spin Wheel Company",
                "spin_frequency" => 24,
            ],
        ]);

        // games
        DB::table("games")->insert([
            [
                "name" => "Game 1",
                "agent_link" => "https://www.google.com",
                "player_link" => "https://www.google.com",
                "display_order" => 2
            ],
            [
                "name" => "Game 2",
                "agent_link" => "https://www.google.com",
                "player_link" => "https://www.google.com",
                "display_order" => 1
            ],
            [
                "name" => "Game 3",
                "agent_link" => "https://www.google.com",
                "player_link" => "https://www.google.com",
                "display_order" => 3
            ]
        ]);

        // payments
        DB::table("payments")->insert([
            [
                "name" => "Payment 1",
            ],
            [
                "name" => "Payment 2",
            ],
            [
                "name" => "Payment 3",
            ]
        ]);

        // sliders
        DB::table("sliders")->insert([
            [
                "title" => "Slider 1",
                "subtitle" => "Subtitle 1",
                "display_order" => 1
            ],
            [
                "title" => "Slider 2",
                "subtitle" => "Subtitle 2",
                "display_order" => 2
            ],
        ]);

        // wheelrules
        DB::table("wheel_rules")->insert([
            [
                "title" => "Wheel Rule 1",
                "description" => "Description 1",
                "display_order" => 1
            ],
            [
                "title" => "Wheel Rule 2",
                "description" => "Description 2",
                "display_order" => 2
            ],
        ]);
        DB::table("wheels")->insert([
            [
                "value" => 1,
                "win_ratio" => 0.1,
            ],
            [
                "value" => 2,
                "win_ratio" => 0.2,
            ],
            [
                "value" => 3,
                "win_ratio" => 0.3,
            ],
            [
                "value" => 4,
                "win_ratio" => 0.4,
            ]
        ]);
    }
}
