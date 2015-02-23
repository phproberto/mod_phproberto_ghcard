<?php
/**
 * @package     Phproberto
 * @subpackage  Library
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López - All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

define('PHPROBERTO_LIB_PATH', __DIR__);

// Global libraries autoloader
JLoader::registerPrefix('Phproberto', PHPROBERTO_LIB_PATH);

// Make available the fields
JFormHelper::addFieldPath(PHPROBERTO_LIB_PATH . '/form/field');

// Make available the booking form rules
JFormHelper::addRulePath(PHPROBERTO_LIB_PATH . '/form/rule');

// Common HTML helpers
JHtml::addIncludePath(PHPROBERTO_LIB_PATH . '/html');

// Load library language
$lang = JFactory::getLanguage();
$lang->load('lib_phproberto', PHPROBERTO_LIB_PATH);
