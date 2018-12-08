<?php
/**
 * Description of configs
 *
 * @author Yehuda Daniel Korotkin
 */
class Config {
    /**
     * Agent name
     * @var string
     */
    public static $agent_name = 'my_php_bot';
    /**
     * Agent host
     * @var string
     */
    public static $agent_host = 'My Bot 2.1.2';
    /**
     * DB CONFIGS
     * @var array
     */
    public static $db_configs = array(
        'read'=>array(
            'connection_string'=>'mysql:host=127.0.0.1;dbname=crawl_8W828g4',
            'username'=>'crawl_353ar8PD',
            'password'=>'QTn7927454u9zC72b49M',
            'port'=>'3306'
        ),
        'write'=>array(
            'connection_string'=>'mysql:host=127.0.0.1;dbname=crawl_8W828g4',
            'username'=>'crawl_353ar8PD',
            'password'=>'QTn7927454u9zC72b49M',
            'port'=>'3306'
        ),
        'fulltext-write'=>array(
            'connection_string'=>'mysql:host=127.0.0.1;dbname=crawl_8W828g4',
            'username'=>'crawl_353ar8PD',
            'password'=>'QTn7927454u9zC72b49M',
            'port'=>'3306'
        )
    );
}



