<?php
/**
 * @package     Phproberto.Module
 * @subpackage  Ghcard.Field
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

// Register our own prefix
JLoader::registerPrefix('Phproberto', dirname(__DIR__));

// Load language
$lang = JFactory::getLanguage();
$lang->load('mod_phproberto_ghcard', dirname(__DIR__));

JFormHelper::loadFieldClass('hidden');

/**
 * Form Field to load a script through field
 *
 * @since  1.0
 */
class PhprobertoFormFieldScript extends JFormFieldHidden
{
	/**
	 * The form field type.
	 *
	 * @var    string
	 * @since  1.0
	 */
	public $type = 'Script';

	/**
	 * Method to get the field input markup
	 *
	 * @return  string  The field input markup.
	 *
	 * @since   1.0
	 */
	protected function getInput()
	{
		if (!$this->loadBootstrap())
		{
			$this->loadJquery();
		}

		$script = isset($this->element['script']) ? (string) $this->element['script'] : null;

		if ($script)
		{
			$moduleInstance = new PhprobertoModuleGhcard;

			$moduleInstance->loadScript($script);
		}

		return parent::getInput();
	}

	/**
	 * Load Bootstrap
	 *
	 * @return  boolean
	 */
	protected function loadBootstrap()
	{
		$loadBootstrap = isset($this->element['loadBootstrap']) ? true : false;

		if ($loadBootstrap)
		{
			JHtml::_('bootstrap.framework');

			return true;
		}

		return false;
	}

	/**
	 * Load jQuery
	 *
	 * @return  boolean
	 */
	protected function loadJquery()
	{
		$loadJquery = isset($this->element['loadJquery']) ? true : false;

		if ($loadJquery)
		{
			JHtml::_('jquery.framework');

			return true;
		}

		return false;
	}
}
