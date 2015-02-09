<?php
/**
 * @package     Phproberto.Module
 * @subpackage  Ghcard
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

// Register our own prefix
JLoader::registerPrefix('Phproberto', __DIR__);

// Load language
$lang = JFactory::getLanguage();
$lang->load('mod_phproberto_ghcard', __DIR__);

$moduleInstance = new PhprobertoModuleGhcard($params);

$cssId = !empty($module->id) ? $moduleInstance->getCssClass() . '-' . $module->id : null;

echo $moduleInstance->render(
	array(
		'module' => $module,
		'cssId'  => $cssId
	)
);
