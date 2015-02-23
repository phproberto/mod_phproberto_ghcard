<?php
/**
 * @package     Github.Module
 * @subpackage  Card
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

JLoader::import('phproberto.library');

// Register our own prefix
JLoader::registerPrefix('Github', __DIR__);

// Load language
$lang = JFactory::getLanguage();
$lang->load('mod_github_card', __DIR__);

$moduleInstance = new GithubModuleCard($params);

$cssId = !empty($module->id) ? $moduleInstance->getCssClass() . '-' . $module->id : null;

echo $moduleInstance->render(
	array(
		'module' => $module,
		'cssId'  => $cssId
	)
);
